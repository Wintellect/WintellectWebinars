# wintellect_demo/bin

The bin folder is where you add your Python scripts that manage your web application.
Do you need to migrate or cleanup data? How about a `wintellect_demo/bin/import_data.py` script?
Need a backup script? Maybe a `wintellect_demo/bin/backup_to_zip.py` script is handy.

Hope you get the idea. That's the goal with `bin`. Just keep in mind you're running inside
a package named `wintellect_demo` so you'll need fully qualify any imports from your project in those scripts.
