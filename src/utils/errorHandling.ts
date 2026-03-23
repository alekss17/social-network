export const getErrorMessage = (error: unknown, fallback = 'Something went wrong') => {
    if (error instanceof Error) {
        return error.message;
    }

    if (typeof error === 'string' && error.trim()) {
        return error;
    }

    return fallback;
};

export const alertError = (error: unknown, fallback?: string) => {
    window.alert(getErrorMessage(error, fallback));
};
