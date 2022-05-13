import { Injectable } from '@angular/core';
import { fromEvent, Subject, Subscription } from 'rxjs';

const SSE_SERVICE_CONFIG = {
  DEFAULT_MESSAGE_TYPE: 'message',
  DEFAULT_EVENTSOURCE_KEY: 'eventSource',
  DEFAULT_SUBSCRIPTION_KEY: 'subscription',
};

const ERROR_MESSAGE_TYPE: string = 'error';

type SseMap = Map<
  string,
  Map<string, EventSource | Subject<any> | Subscription>
>;

@Injectable({
  providedIn: 'root',
})
export class SseService {
  private _sseMap: SseMap = new Map();
  get sseMap() {
    return this._sseMap;
  }

  /**
   *
   * Creat an new SSE connection or use the existing one
   * @param url The sse api endpoint
   * @param type Default value 'message', except 'error',
   * @returns Subject
   */
  getServerSentEvent<T>(
    url: string,
    type: string = SSE_SERVICE_CONFIG.DEFAULT_MESSAGE_TYPE
  ): Subject<any> {
    if (!this._sseMap.has(url)) {
      const currentSubjectNewUrl = new Subject();
      this._sseMap.set(url, new Map());
      this._sseMap
        .get(url)
        ?.set(SSE_SERVICE_CONFIG.DEFAULT_EVENTSOURCE_KEY, new EventSource(url))
        .set(
          SSE_SERVICE_CONFIG.DEFAULT_SUBSCRIPTION_KEY,
          this.createSubscription(url, type, currentSubjectNewUrl)
        )
        .set(type, currentSubjectNewUrl);

      // Add error handling if new
      this.createErrorHandling(url);
    } else if (
      !this._sseMap.get(url)?.has(type) &&
      type != ERROR_MESSAGE_TYPE
    ) {
      const currentSubjectNewType = new Subject();
      this.createSubscription(
        url,
        type,
        currentSubjectNewType,
        this._sseMap
          .get(url)
          ?.get(SSE_SERVICE_CONFIG.DEFAULT_SUBSCRIPTION_KEY) as Subscription
      );
      this._sseMap.get(url)?.set(type, currentSubjectNewType);
    } else if (type === ERROR_MESSAGE_TYPE) {
      throw new Error(
        `You should do error handling in observer's Error Callback.`
      );
    }

    return this._sseMap.get(url)?.get(type) as Subject<T>;
  }

  /**
   *
   * Close an existing SSE connection
   * @param url The sse api endpoint
   * @returns void
   */
  closeServerSentEvent(url: string): void {
    const eventSource = this._sseMap
      .get(url)
      ?.get(SSE_SERVICE_CONFIG.DEFAULT_EVENTSOURCE_KEY) as EventSource;
    this.closeConnection(eventSource);
  }

  private createErrorHandling(url: string): void {
    fromEvent(
      this._sseMap
        .get(url)
        ?.get(SSE_SERVICE_CONFIG.DEFAULT_EVENTSOURCE_KEY) as EventSource,
      ERROR_MESSAGE_TYPE
    ).subscribe((error) => {
      this._sseMap.get(url)?.forEach((value) => {
        if (value instanceof Subject) {
          value.error(error);
        }
      });
    });
  }

  private createSubscription(
    url: string,
    type: string,
    currentSubject: Subject<any>,
    exSubscription?: Subscription
  ): Subscription {
    const subscription =
      exSubscription instanceof Subscription
        ? exSubscription
        : new Subscription();
    subscription.add(
      fromEvent(
        this._sseMap
          .get(url)
          ?.get(SSE_SERVICE_CONFIG.DEFAULT_EVENTSOURCE_KEY) as EventSource,
        type
      ).subscribe(currentSubject)
    );

    return subscription;
  }

  private closeConnection(eventSource: EventSource): void {
    (
      this._sseMap
        .get(eventSource.url)
        ?.get(SSE_SERVICE_CONFIG.DEFAULT_SUBSCRIPTION_KEY) as Subscription
    ).unsubscribe();
    eventSource.close();
    this._sseMap.delete(eventSource.url);
  }
}
