CREATE KEYSPACE IF NOT EXISTS supplier
WITH replication = {
  'class': 'NetworkTopologyStrategy',
  'datacenter1': 2
}
AND durable_writes = true;

USE supplier;
