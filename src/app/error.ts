import { HttpErrorResponse } from '@angular/common/http';
import { throwError } from 'rxjs';

export function handleError(error: HttpErrorResponse) {
  if (error.status === 0) {
    console.log('An Error Ocurred');
  } else if (error.status === 401) {
    localStorage.clear();
    location.reload();
  } else {
    console.error(
      `Backend returned code ${error.status}, body was: `,
      error.error.error.message
    );
  }
  return throwError(
    () => new Error('Something bad happened; please try again later.')
  );
  //   return { msg: error.error.error.message, type: 'danger' };
}
