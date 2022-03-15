// ************Server Sent Events Fields*************
// ==================================================
// event
// A string identifying the type of event described. If this is specified, an event will be dispatched on the browser to the listener for the specified event name; the website source code should use addEventListener() to listen for named events. The onmessage handler is called if no event name is specified for a message.

// data
// The data field for the message. When the EventSource receives multiple consecutive lines that begin with data:, it concatenates them, inserting a newline character between each one. Trailing newlines are removed.

// id
// The event ID to set the EventSource object's last event ID value.

// retry
// The reconnection time. If the connection to the server is lost, the browser will wait for the specified time before attempting to reconnect. This must be an integer, specifying the reconnection time in milliseconds. If a non-integer value is specified, the field is ignored.

// All other field names are ignored.
// ==================================================
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
          new Subscription()
            .add(
              this.createFromEvent(
                this.sseMap
                  .get(url)
                  ?.get(
                    SSE_SERVICE_CONFIG.DEFAULT_EVENTSOURCE_KEY
                  ) as EventSource,
                type,
                currentSubject
              )
            )
            .add(
              this.createFromEvent(
                this.sseMap
                  .get(url)
                  ?.get(
                    SSE_SERVICE_CONFIG.DEFAULT_EVENTSOURCE_KEY
                  ) as EventSource,
                ERROR_MESSAGE_TYPE,
                currentSubject
              )
            )
        )
        .set(type, currentSubject);
    } else if (!this.sseMap.get(url)?.has(type)) {
      (
        this.sseMap
          .get(url)
          ?.get(SSE_SERVICE_CONFIG.DEFAULT_SUBSCRIPTION_KEY) as Subscription
      )
        .add(
          this.createFromEvent(
            this.sseMap
              .get(url)
              ?.get(SSE_SERVICE_CONFIG.DEFAULT_EVENTSOURCE_KEY) as EventSource,
            type,
            currentSubject
          )
        )
        .add(
          this.createFromEvent(
            this.sseMap
              .get(url)
              ?.get(SSE_SERVICE_CONFIG.DEFAULT_EVENTSOURCE_KEY) as EventSource,
            ERROR_MESSAGE_TYPE,
            currentSubject
          )
        );
      this.sseMap.get(url)?.set(type, currentSubject);
    }

    return this.sseMap.get(url)?.get(type) as Subject<any>;
  }

  closeServerSentEvent(url: string): void {
    const eventSource = this.sseMap
      .get(url)
      ?.get(SSE_SERVICE_CONFIG.DEFAULT_EVENTSOURCE_KEY) as EventSource;
    this.closeConnection(eventSource);
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
