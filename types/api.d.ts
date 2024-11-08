export interface IResponseSuccess<R> {
	data: R;
	error: false;
	errorMessage?: null;
	message?: null;
	status: number;
	success: true;
}

interface IResponseError {
	error: true;
	errorMessage: string;
	message?: null;
	status: number;
	success: false;
}

type IResponse<R> = IResponseSuccess<R>;
type IResponseSilent<R> = IResponseError | IResponseSuccess<R>;

export as namespace API;
