FROM redis:7.0.9-alpine
COPY tests-redis-entrypoint.sh /tests-redis-entrypoint.sh
RUN chmod +x /tests-redis-entrypoint.sh
ENTRYPOINT ["/tests-redis-entrypoint.sh"]
CMD []