export interface IResponseSuccess<R> {
	data: R;
	error: false;
	errorMessage?: null;
	message?: null;
	status: number;
	success: true;
}

interface IResponseError<R> {
	data?: R | null;
	error: true;
	errorMessage: string;
	message?: null;
	status: number;
	success: false;
}

type IResponse<R> = IResponseError<R> | IResponseSuccess<R>;

export as namespace API;
