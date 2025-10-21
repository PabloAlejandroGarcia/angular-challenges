import { inject, Injectable } from '@angular/core';
import { combineLatest, map, Observable, of } from 'rxjs';
import { LocalDBService, TopicType } from './localDB.service';

@Injectable({ providedIn: 'root' })
export class AppService {
  private dbService = inject(LocalDBService);

  getAllInfo = this.dbService.infos;

  deleteOldTopics(type: TopicType): Observable<boolean> {
    const infoByType = this.dbService.searchByType(type);
    return infoByType.length > 0
      ? infoByType
          .map((t) => this.dbService.deleteOneTopic(t.id))
          .reduce(
            (acc, curr) =>
              combineLatest([acc, curr]).pipe(map(([a, c]) => a && c)),
            of(true),
          )
      : of(true);
  }
}
