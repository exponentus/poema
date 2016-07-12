import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Rx';

@Injectable()
export class UploadService {
    public progress$: Observable<any>;
    private progressObserver: any;

    constructor() {
        this.progress$ = Observable.create(observer => {
            this.progressObserver = observer;
        }).share();
    }

    makeFileRequest(url: string, params: any, files: File[]): Observable<any> {
        return Observable.create(observer => {
            let formData: FormData = new FormData(),
                xhr: XMLHttpRequest = new XMLHttpRequest();

            for (let i = 0; i < files.length; i++) {
                formData.append('uploads[]', files[i], files[i].name);
            }

            if (params) {
                for (let k in params) {
                    formData.append(k, params[k]);
                }
            }

            xhr.onreadystatechange = () => {
                if (xhr.readyState === 4) {
                    if (xhr.status === 200) {
                        observer.next(JSON.parse(xhr.response));
                        observer.complete();
                    } else {
                        observer.error(xhr.response);
                    }
                }
            };

            xhr.upload.onprogress = (event) => {
                let progress = Math.round(event.loaded / event.total * 100);
                this.progressObserver.next(progress);
            };

            xhr.open('POST', url, true);
            xhr.send(formData);
        });
    }
}
