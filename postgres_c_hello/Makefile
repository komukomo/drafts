MODULES = hello
EXTENSION = hello
DATA = hello--1.0.sql

PG_CONFIG = pg_config
PGXS = $(shell $(PG_CONFIG) --pgxs)
INCLUDEDIR = $(shell $(PG_CONFIG) --includedir-server)
include $(PGXS)

hello.so: hello.o
	cc -shared -o hello.so hello.o

hello.o: hello.c
	cc -o hello.o -c hello.c $(CFLAGS) -I$(INCLUDEDIR)

