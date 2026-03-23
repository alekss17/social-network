import React from "react";

function identity<T>(value: T): T {
    return value
}

const TestForProps = () => {

     const value = Math.random() < 0.5
    ? "hello world"
    : Math.floor(Math.random() * 100);

    return (
        <>
        Age or Hello World: {identity(value) }
        </>
    )
}

export default TestForProps;
