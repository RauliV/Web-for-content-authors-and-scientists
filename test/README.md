# Test files (Mocha) for the project go here

Add the name and description of each HTML file in the README. Include short
description of what is tested and what needs to be implemented before the tests
are run. Just a minimal description is enough because the tests should still
give the more detailed feedback and make it evident what is tested.

This listing should serve as a reminder for us of what is already implemented
and which filenames are already taken. And when the tests are actually published
the students will have all this information in one single place.

The HTML files should be named with the following pattern: `<name>.test.html`
The mocha tests of each file should go under directories which are named after
the HTML file. For example assume file `example.test.html`. All the tests should
go under `example`-directory. And under that directory each JavaScript file should
have mocha tests and those files should be named with pattern `<test-name>.test.js`.

This way all the tests are separated and we can modify and add new tests without
any merge conflicts and if for some reason you need to work on tests someone else
has implemented originally you can find them easily.
## Example content for the readme when tests are published

### example.test.html

Put description of test requirements and prerequisites here. We should probably
try to order this list in the order that the tests are most convenient to run.

### other-example.test.html

These tests require that the following tests pass:
- example.test.html
