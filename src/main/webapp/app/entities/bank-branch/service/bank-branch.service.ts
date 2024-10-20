import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';

import { isPresent } from 'app/core/util/operators';
import { ApplicationConfigService } from 'app/core/config/application-config.service';
import { createRequestOption } from 'app/core/request/request-util';
import { IBankBranch, NewBankBranch } from '../bank-branch.model';

export type PartialUpdateBankBranch = Partial<IBankBranch> & Pick<IBankBranch, 'id'>;

export type EntityResponseType = HttpResponse<IBankBranch>;
export type EntityArrayResponseType = HttpResponse<IBankBranch[]>;

@Injectable({ providedIn: 'root' })
export class BankBranchService {
  protected resourceUrl = this.applicationConfigService.getEndpointFor('api/employee-mgt/bank-branches');

  constructor(protected http: HttpClient, protected applicationConfigService: ApplicationConfigService) {}

  create(bankBranch: NewBankBranch): Observable<EntityResponseType> {
    return this.http.post<IBankBranch>(this.resourceUrl, bankBranch, { observe: 'response' });
  }

  update(bankBranch: IBankBranch): Observable<EntityResponseType> {
    return this.http.put<IBankBranch>(this.resourceUrl, bankBranch, { observe: 'response' });
  }

  partialUpdate(bankBranch: PartialUpdateBankBranch): Observable<EntityResponseType> {
    return this.http.patch<IBankBranch>(`${this.resourceUrl}/${this.getBankBranchIdentifier(bankBranch)}`, bankBranch, {
      observe: 'response',
    });
  }

  find(id: number): Observable<EntityResponseType> {
    return this.http.get<IBankBranch>(`${this.resourceUrl}/${id}`, { observe: 'response' });
  }

  query(req?: any): Observable<EntityArrayResponseType> {
    const options = createRequestOption(req);
    return this.http.get<IBankBranch[]>(this.resourceUrl, { params: options, observe: 'response' });
  }

  queryPage(req?: any): Observable<EntityArrayResponseType> {
    const options = createRequestOption(req);
    return this.http.get<IBankBranch[]>(`${this.resourceUrl}/page`, { params: options, observe: 'response' });
  }

  delete(id: number): Observable<HttpResponse<{}>> {
    return this.http.delete(`${this.resourceUrl}/${id}`, { observe: 'response' });
  }

  getBankBranchIdentifier(bankBranch: Pick<IBankBranch, 'id'>): number {
    return bankBranch.id;
  }

  compareBankBranch(o1: Pick<IBankBranch, 'id'> | null, o2: Pick<IBankBranch, 'id'> | null): boolean {
    return o1 && o2 ? this.getBankBranchIdentifier(o1) === this.getBankBranchIdentifier(o2) : o1 === o2;
  }

  addBankBranchToCollectionIfMissing<Type extends Pick<IBankBranch, 'id'>>(
    bankBranchCollection: Type[],
    ...bankBranchesToCheck: (Type | null | undefined)[]
  ): Type[] {
    const bankBranches: Type[] = bankBranchesToCheck.filter(isPresent);
    if (bankBranches.length > 0) {
      const bankBranchCollectionIdentifiers = bankBranchCollection.map(bankBranchItem => this.getBankBranchIdentifier(bankBranchItem)!);
      const bankBranchesToAdd = bankBranches.filter(bankBranchItem => {
        const bankBranchIdentifier = this.getBankBranchIdentifier(bankBranchItem);
        if (bankBranchCollectionIdentifiers.includes(bankBranchIdentifier)) {
          return false;
        }
        bankBranchCollectionIdentifiers.push(bankBranchIdentifier);
        return true;
      });
      return [...bankBranchesToAdd, ...bankBranchCollection];
    }
    return bankBranchCollection;
  }
}
