CREATE FUNCTION _hello() RETURNS integer AS 
'$libdir/hello', '_hello'
LANGUAGE c IMMUTABLE;
