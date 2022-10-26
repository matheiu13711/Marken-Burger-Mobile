import { HttpErrorResponse, HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable, throwError } from "rxjs";
import { Router } from "@angular/router";
import { ApiService } from "../api.service";
import { catchError } from "rxjs/operators";

@Injectable()
export class AuthInterceptor implements HttpInterceptor{
    execute = false;
    constructor(private router: Router, private ApiService: ApiService){

    }

    intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        const idToken = localStorage.getItem('token');
        if (idToken ) {
            const cloned = req.clone({
                headers: req.headers.set("Authorization", "Bearer " + idToken)
            });
            //console.log('from auth interceptor: ', req);
            //console.log('handler: ', next);
            // next.handle(cloned).subscribe(()=>{}, (err)=>{

            // })
            return next.handle(cloned).pipe(catchError((err: any)=>{
                if(err instanceof HttpErrorResponse && !this.execute){
                    if(err.status === 401){
                        console.log('invalid token, login again.');
                        localStorage.clear();  
                        this.execute = true;
                        this.router.navigateByUrl('/login')
                    } 
                    return throwError(err);
                } else {
                    return next.handle(req);
                }
            }));
            
        } else {
            return next.handle(req);
        }
        
    }
    
}