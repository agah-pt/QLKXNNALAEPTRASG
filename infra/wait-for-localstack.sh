until [ "$(aws sts  get-caller-identity | jq -r '.Account')" = "000000000000" ];
do
  echo "Waiting for llocalstack..."
  sleep 1s
done

echo "Localstack looks ready..."
