#!/bin/bash

# Activate virtual environment if needed
# source venv/bin/activate

# Run tests
echo "Running tests..."
pytest src/tests --maxfail=1 --disable-warnings -q

# Check the exit status of pytest
if [ $? -eq 0 ]; then
    echo "All tests passed successfully."
else
    echo "Some tests failed."
    exit 1
fi
