import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';

import { ICertificatev2 } from '../certificatev-2.model';
import { sampleWithRequiredData, sampleWithNewData, sampleWithPartialData, sampleWithFullData } from '../certificatev-2.test-samples';

import { Certificatev2Service } from './certificatev-2.service';

const requireRestSample: ICertificatev2 = {
  ...sampleWithRequiredData,
};

describe('Certificatev2 Service', () => {
  let service: Certificatev2Service;
  let httpMock: HttpTestingController;
  let expectedResult: ICertificatev2 | ICertificatev2[] | boolean | null;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
    });
    expectedResult = null;
    service = TestBed.inject(Certificatev2Service);
    httpMock = TestBed.inject(HttpTestingController);
  });

  describe('Service methods', () => {
    it('should find an element', () => {
      const returnedFromService = { ...requireRestSample };
      const expected = { ...sampleWithRequiredData };

      service.find(123).subscribe(resp => (expectedResult = resp.body));

      const req = httpMock.expectOne({ method: 'GET' });
      req.flush(returnedFromService);
      expect(expectedResult).toMatchObject(expected);
    });

    it('should create a Certificatev2', () => {
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      const certificatev2 = { ...sampleWithNewData };
      const returnedFromService = { ...requireRestSample };
      const expected = { ...sampleWithRequiredData };

      service.create(certificatev2).subscribe(resp => (expectedResult = resp.body));

      const req = httpMock.expectOne({ method: 'POST' });
      req.flush(returnedFromService);
      expect(expectedResult).toMatchObject(expected);
    });

    it('should update a Certificatev2', () => {
      const certificatev2 = { ...sampleWithRequiredData };
      const returnedFromService = { ...requireRestSample };
      const expected = { ...sampleWithRequiredData };

      service.update(certificatev2).subscribe(resp => (expectedResult = resp.body));

      const req = httpMock.expectOne({ method: 'PUT' });
      req.flush(returnedFromService);
      expect(expectedResult).toMatchObject(expected);
    });

    it('should partial update a Certificatev2', () => {
      const patchObject = { ...sampleWithPartialData };
      const returnedFromService = { ...requireRestSample };
      const expected = { ...sampleWithRequiredData };

      service.partialUpdate(patchObject).subscribe(resp => (expectedResult = resp.body));

      const req = httpMock.expectOne({ method: 'PATCH' });
      req.flush(returnedFromService);
      expect(expectedResult).toMatchObject(expected);
    });

    it('should return a list of Certificatev2', () => {
      const returnedFromService = { ...requireRestSample };

      const expected = { ...sampleWithRequiredData };

      service.query().subscribe(resp => (expectedResult = resp.body));

      const req = httpMock.expectOne({ method: 'GET' });
      req.flush([returnedFromService]);
      httpMock.verify();
      expect(expectedResult).toMatchObject([expected]);
    });

    it('should delete a Certificatev2', () => {
      const expected = true;

      service.delete(123).subscribe(resp => (expectedResult = resp.ok));

      const req = httpMock.expectOne({ method: 'DELETE' });
      req.flush({ status: 200 });
      expect(expectedResult).toBe(expected);
    });

    describe('addCertificatev2ToCollectionIfMissing', () => {
      it('should add a Certificatev2 to an empty array', () => {
        const certificatev2: ICertificatev2 = sampleWithRequiredData;
        expectedResult = service.addCertificatev2ToCollectionIfMissing([], certificatev2);
        expect(expectedResult).toHaveLength(1);
        expect(expectedResult).toContain(certificatev2);
      });

      it('should not add a Certificatev2 to an array that contains it', () => {
        const certificatev2: ICertificatev2 = sampleWithRequiredData;
        const certificatev2Collection: ICertificatev2[] = [
          {
            ...certificatev2,
          },
          sampleWithPartialData,
        ];
        expectedResult = service.addCertificatev2ToCollectionIfMissing(certificatev2Collection, certificatev2);
        expect(expectedResult).toHaveLength(2);
      });

      it("should add a Certificatev2 to an array that doesn't contain it", () => {
        const certificatev2: ICertificatev2 = sampleWithRequiredData;
        const certificatev2Collection: ICertificatev2[] = [sampleWithPartialData];
        expectedResult = service.addCertificatev2ToCollectionIfMissing(certificatev2Collection, certificatev2);
        expect(expectedResult).toHaveLength(2);
        expect(expectedResult).toContain(certificatev2);
      });

      it('should add only unique Certificatev2 to an array', () => {
        const certificatev2Array: ICertificatev2[] = [sampleWithRequiredData, sampleWithPartialData, sampleWithFullData];
        const certificatev2Collection: ICertificatev2[] = [sampleWithRequiredData];
        expectedResult = service.addCertificatev2ToCollectionIfMissing(certificatev2Collection, ...certificatev2Array);
        expect(expectedResult).toHaveLength(3);
      });

      it('should accept varargs', () => {
        const certificatev2: ICertificatev2 = sampleWithRequiredData;
        const certificatev22: ICertificatev2 = sampleWithPartialData;
        expectedResult = service.addCertificatev2ToCollectionIfMissing([], certificatev2, certificatev22);
        expect(expectedResult).toHaveLength(2);
        expect(expectedResult).toContain(certificatev2);
        expect(expectedResult).toContain(certificatev22);
      });

      it('should accept null and undefined values', () => {
        const certificatev2: ICertificatev2 = sampleWithRequiredData;
        expectedResult = service.addCertificatev2ToCollectionIfMissing([], null, certificatev2, undefined);
        expect(expectedResult).toHaveLength(1);
        expect(expectedResult).toContain(certificatev2);
      });

      it('should return initial array if no Certificatev2 is added', () => {
        const certificatev2Collection: ICertificatev2[] = [sampleWithRequiredData];
        expectedResult = service.addCertificatev2ToCollectionIfMissing(certificatev2Collection, undefined, null);
        expect(expectedResult).toEqual(certificatev2Collection);
      });
    });

    describe('compareCertificatev2', () => {
      it('Should return true if both entities are null', () => {
        const entity1 = null;
        const entity2 = null;

        const compareResult = service.compareCertificatev2(entity1, entity2);

        expect(compareResult).toEqual(true);
      });

      it('Should return false if one entity is null', () => {
        const entity1 = { id: 123 };
        const entity2 = null;

        const compareResult1 = service.compareCertificatev2(entity1, entity2);
        const compareResult2 = service.compareCertificatev2(entity2, entity1);

        expect(compareResult1).toEqual(false);
        expect(compareResult2).toEqual(false);
      });

      it('Should return false if primaryKey differs', () => {
        const entity1 = { id: 123 };
        const entity2 = { id: 456 };

        const compareResult1 = service.compareCertificatev2(entity1, entity2);
        const compareResult2 = service.compareCertificatev2(entity2, entity1);

        expect(compareResult1).toEqual(false);
        expect(compareResult2).toEqual(false);
      });

      it('Should return false if primaryKey matches', () => {
        const entity1 = { id: 123 };
        const entity2 = { id: 123 };

        const compareResult1 = service.compareCertificatev2(entity1, entity2);
        const compareResult2 = service.compareCertificatev2(entity2, entity1);

        expect(compareResult1).toEqual(true);
        expect(compareResult2).toEqual(true);
      });
    });
  });

  afterEach(() => {
    httpMock.verify();
  });
});
