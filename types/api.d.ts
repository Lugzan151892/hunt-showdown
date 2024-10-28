export interface IError {
	errors?: Array<{
		field: string;
		message: string[];
	}>;
	message?: string;
}

interface IResponseSuccess<R> {
	data: R;
	success: true;
}

interface IResponseError<R> {
	error: IError;
	success: false;
}

type IResponse<R> = IResponseError<R> | IResponseSuccess<R>;

export as namespace API;
