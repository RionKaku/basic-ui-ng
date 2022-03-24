import { Injectable } from '@angular/core';
import { fromEvent, Subject, Subscription } from 'rxjs';

const SSE_SERVICE_CONFIG = {
  DEFAULT_MESSAGE_TYPE: 'message',
  DEFAULT_EVENTSOURCE_KEY: 'eventSource',
  DEFAULT_SUBSCRIPTION_KEY: 'subscription',
};

const ERROR_MESSAGE_TYPE: string = 'error';

@Injectable({
  providedIn: 'root',
})
export class SseService {
  private sseMap: Map<
    string,
    Map<string, EventSource | Subject<any> | Subscription>
  > = new Map();

  /**
   *
   * Creat an new SSE connection or use the existing one
   * @param url The sse api endpoint
   * @param type The messtype except 'error', default value is 'message'
   * @returns Subject
   */
  getServerSentEvent(
    url: string,
    type: string = SSE_SERVICE_CONFIG.DEFAULT_MESSAGE_TYPE
  ): Subject<any> {
    const currentSubject = new Subject();

    if (!this.sseMap.has(url)) {
      this.sseMap.set(url, new Map());
      this.sseMap
        .get(url)
        ?.set(SSE_SERVICE_CONFIG.DEFAULT_EVENTSOURCE_KEY, new EventSource(url))
        .set(
          SSE_SERVICE_CONFIG.DEFAULT_SUBSCRIPTION_KEY,
          this.createSubscription(url, type, currentSubject)
        )
        .set(type, currentSubject);
    } else if (!this.sseMap.get(url)?.has(type) && type != ERROR_MESSAGE_TYPE) {
      this.createSubscription(
        url,
        type,
        currentSubject,
        this.sseMap
          .get(url)
          ?.get(SSE_SERVICE_CONFIG.DEFAULT_SUBSCRIPTION_KEY) as Subscription
      );
      this.sseMap.get(url)?.set(type, currentSubject);
    }

    return this.sseMap.get(url)?.get(type) as Subject<any>;
  }

  /**
   *
   * Close an existing SSE connection
   * @param url The sse api endpoint
   * @returns void
   */
  closeServerSentEvent(url: string): void {
    const eventSource = this.sseMap
      .get(url)
      ?.get(SSE_SERVICE_CONFIG.DEFAULT_EVENTSOURCE_KEY) as EventSource;
    this.closeConnection(eventSource);
  }

  private createSubscription(
    url: string,
    type: string,
    currentSubject: Subject<any>,
    exSubscription?: Subscription
  ): Subscription {
    const subscription = exSubscription ?? new Subscription();
    subscription.add(
      this.createFromEvent(
        this.sseMap
          .get(url)
          ?.get(SSE_SERVICE_CONFIG.DEFAULT_EVENTSOURCE_KEY) as EventSource,
        type,
        currentSubject
      )
    );
    if (exSubscription === undefined) {
      subscription.add(
        this.createFromEvent(
          this.sseMap
            .get(url)
            ?.get(SSE_SERVICE_CONFIG.DEFAULT_EVENTSOURCE_KEY) as EventSource,
          ERROR_MESSAGE_TYPE,
          currentSubject
        )
      );
    }

    return subscription;
  }

  private createFromEvent(
    eventSource: EventSource,
    type: string,
    currentSubject: Subject<any>
  ): Subscription {
    if (type == ERROR_MESSAGE_TYPE) {
      return fromEvent(eventSource, type).subscribe((error) => {
        currentSubject.error(error);
        // close connection by default // other implements TODO
        this.closeConnection(eventSource);
      });
    } else {
      return fromEvent(eventSource, type).subscribe(currentSubject);
    }
  }

  private closeConnection(eventSource: EventSource): void {
    (
      this.sseMap
        .get(eventSource.url)
        ?.get(SSE_SERVICE_CONFIG.DEFAULT_SUBSCRIPTION_KEY) as Subscription
    ).unsubscribe();
    eventSource.close();
    this.sseMap.delete(eventSource.url);
  }
}
