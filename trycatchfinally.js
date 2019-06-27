try {
    document.write("Outer try running...<br/>");

    try {
        document.write("Nested try running...<br/>");
        throw new Error(301, "an error");
    }
    catch (e) {
        document.write ("Nested catch caught " + e.message + "<br/>");
        throw e;
    }
    finally {
        document.write ("Nested finally is running...<br/>");
    }
}
catch (e) {
    document.write ("Outer catch caught " + e.message + "<br/>");
}
finally {
    document.write ("Outer finally running");
}

// Output:
// Outer try running...
// Nested try running...
// Nested catch caught error from nested try
// Nested finally is running...
// Outer catch caught error from nested try
// Outer finally running