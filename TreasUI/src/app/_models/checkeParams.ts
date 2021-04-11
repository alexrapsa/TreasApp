export class CheckeParams {
    minDate = '2021-01-01T00:00:00';
    maxDate = '2030-01-01T00:00:00';
    pageNumber = 1;
    pageSize = 10;
    isReceived: boolean;

    constructor(isReceived: boolean){
        this.isReceived = isReceived;
    }


}