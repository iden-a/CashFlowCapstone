\echo 'Delete and recreate cashflow db?'
\prompt 'Return for yes or control-C to cancel > ' answer

DROP DATABASE cashflow;
CREATE DATABASE cashflow;
\connect cashflow

\i cashflow-schema.sql