import { Component, OnInit } from '@angular/core';
import { HttpHeaders } from '@angular/common/http';
import { ActivatedRoute, Data, ParamMap, Router } from '@angular/router';
import { combineLatest, filter, Observable, switchMap, tap } from 'rxjs';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

import { IBankBranch } from '../bank-branch.model';

import { ITEMS_PER_PAGE } from 'app/config/pagination.constants';
import { ASC, DESC, SORT, ITEM_DELETED_EVENT, DEFAULT_SORT_DATA } from 'app/config/navigation.constants';
import { EntityArrayResponseType, BankBranchService } from '../service/bank-branch.service';
import { BankBranchDeleteDialogComponent } from '../delete/bank-branch-delete-dialog.component';
import { ParseLinks } from 'app/core/util/parse-links.service';

@Component({
  selector: 'jhi-bank-branch',
  templateUrl: './bank-branch.component.html',
})
export class BankBranchComponent implements OnInit {
  bankBranches?: IBankBranch[];
  isLoading = false;

  predicate = 'branchName';
  ascending = true;

  itemsPerPage = ITEMS_PER_PAGE;
  links: { [key: string]: number } = {
    last: 0,
  };
  page = 1;

  constructor(
    protected bankBranchService: BankBranchService,
    protected activatedRoute: ActivatedRoute,
    public router: Router,
    protected parseLinks: ParseLinks,
    protected modalService: NgbModal
  ) {}

  reset(): void {
    this.page = 1;
    this.bankBranches = [];
    this.load();
  }

  loadPage(page: number): void {
    this.page = page;
    this.load();
  }

  trackId = (_index: number, item: IBankBranch): number => this.bankBranchService.getBankBranchIdentifier(item);

  ngOnInit(): void {
    this.load();
  }

  loadAll(): void {
    const queryObject = {
      page: 0,
      size: this.bankBranches.length-1,
      sort: this.getSortQueryParam(),
    };
    this.bankBranchService.queryPage(queryObject).subscribe(res => (this.bankBranches = res.body || []));
  }

  delete(bankBranch: IBankBranch): void {
    const modalRef = this.modalService.open(BankBranchDeleteDialogComponent, { size: 'lg', backdrop: 'static' });
    modalRef.componentInstance.bankBranch = bankBranch;
    // unsubscribe not needed because closed completes on modal close
    modalRef.closed
      .subscribe({
        next: (res: EntityArrayResponseType) => {
          this.loadAll();
        },
      });
  }

  load(): void {
    this.loadFromBackendWithRouteInformations().subscribe({
      next: (res: EntityArrayResponseType) => {
        this.onResponseSuccess(res);
      },
    });
  }

  navigateToWithComponentValues(): void {
    this.handleNavigation(this.page, this.predicate, this.ascending);
  }

  navigateToPage(page = this.page): void {
    this.handleNavigation(page, this.predicate, this.ascending);
  }

  protected loadFromBackendWithRouteInformations(): Observable<EntityArrayResponseType> {
    return combineLatest([this.activatedRoute.queryParamMap, this.activatedRoute.data]).pipe(
      tap(([params, data]) => this.fillComponentAttributeFromRoute(params, data)),
      switchMap(() => this.queryBackend(this.page, this.predicate, this.ascending))
    );
  }

  protected fillComponentAttributeFromRoute(params: ParamMap, data: Data): void {
    // const sort = (params.get(SORT) ?? data[DEFAULT_SORT_DATA]).split(',');
    // this.predicate = sort[0];
    // this.ascending = sort[1] === ASC;
  }

  protected onResponseSuccess(response: EntityArrayResponseType): void {
    this.fillComponentAttributesFromResponseHeader(response.headers);
    const dataFromBody = this.fillComponentAttributesFromResponseBody(response.body);
    this.bankBranches = dataFromBody;
  }

  protected fillComponentAttributesFromResponseBody(data: IBankBranch[] | null): IBankBranch[] {
    const bankBranchesNew = this.bankBranches ?? [];
    if (data) {
      for (const d of data) {
        if (bankBranchesNew.map(op => op.id).indexOf(d.id) === -1) {
          bankBranchesNew.push(d);
        }
      }
    }
    return bankBranchesNew;
  }

  protected fillComponentAttributesFromResponseHeader(headers: HttpHeaders): void {
    const linkHeader = headers.get('link');
    if (linkHeader) {
      this.links = this.parseLinks.parse(linkHeader);
    } else {
      this.links = {
        last: 0,
      };
    }
  }

  protected queryBackend(page?: number, predicate?: string, ascending?: boolean): Observable<EntityArrayResponseType> {
    this.isLoading = true;
    const pageToLoad: number = page ?? 1;
    const queryObject = {
      page: pageToLoad - 1,
      size: this.itemsPerPage,
      sort: this.getSortQueryParam(predicate, ascending),
    };
    return this.bankBranchService.queryPage(queryObject).pipe(tap(() => (this.isLoading = false)));
  }

  protected handleNavigation(page = this.page, predicate?: string, ascending?: boolean): void {
    const queryParamsObj = {
      page,
      size: this.itemsPerPage,
      sort: this.getSortQueryParam(predicate, ascending),
    };

    this.router.navigate(['./'], {
      relativeTo: this.activatedRoute,
      queryParams: queryParamsObj,
    });
  }

  protected getSortQueryParam(predicate = this.predicate, ascending = this.ascending): string[] {
    const ascendingQueryParam = ascending ? ASC : DESC;
    if (predicate === '') {
      return [];
    } else {
      return [predicate + ',' + ascendingQueryParam];
    }
  }
}
