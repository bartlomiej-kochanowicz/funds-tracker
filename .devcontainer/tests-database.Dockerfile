FROM postgres:17.4-alpine
COPY tests-database-entrypoint.sh /tests-database-entrypoint.sh
RUN chmod +x /tests-database-entrypoint.sh
ENTRYPOINT ["/tests-database-entrypoint.sh"]
CMD []