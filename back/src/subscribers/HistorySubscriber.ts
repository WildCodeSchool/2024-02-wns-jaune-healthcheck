import { EventSubscriber, InsertEvent } from "typeorm";
import { EntitySubscriberInterface } from "typeorm";
import { History } from "../entities/History";


@EventSubscriber()
export class HistorySubscriber implements EntitySubscriberInterface<History> {
    listenTo() {
        return History;
    }

    beforeInsert(event: InsertEvent<History>) {
      const url = event.entity.url;
      History.deleteOldHistoriesByUrl(url);
    }
}