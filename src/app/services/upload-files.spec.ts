import { TestBed } from '@angular/core/testing';

import { UploadFiles } from './upload-files';

describe('UploadFiles', () => {
  let service: UploadFiles;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(UploadFiles);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
