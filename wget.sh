#!/usr/bin/env bash
docker exec flask bash -c "wget https://geolite.maxmind.com/download/geoip/database/GeoLite2-City.tar.gz &&
 mkdir GeoLite2 && tar -xvzf GeoLite2-City.tar.gz -C GeoLite2 --strip-components 1 &&
  rm GeoLite2-City.tar.gz"
