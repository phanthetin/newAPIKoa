HOST_DEPLOY='root@54.179.188.75.com'
ENV_PATH='.env.pro'
BUILD_PATH='dist/'
TAGET_PATH='/home/new-project/app'
CONTAINER_NAME='new-project'

npm run build;
echo ">>> Build done $CONTAINER_NAME"
cp $ENV_PATH $BUILD_PATH'.env'
if [ "$?" -eq "0" ];
then
    echo ">>> SCP .env succesfully!"
    cp package.json dist/package.json;
    cp_package=$?

    cp -r src/template dist/template;
    cp_template=$?

    cp docker-compose.yml dist/docker-compose.yml;
    cp_docker_compose=$?

    cp Dockerfile dist/Dockerfile;
    cp_dockerfile=$?

    cp run-container.sh dist/run-container.sh;
    cp_run_container=$?

    if [ "$cp_package" -eq "0" ] && [ "$cp_template" -eq "0" ] && [ "$cp_docker_compose" -eq "0" ] && [ "$cp_dockerfile" -eq "0" ] && [ "$cp_run_container" -eq "0" ];
    then
        echo ">>> Copy files succesfully!"
        echo "> Start deploy to F1!"
        read -r -p ">> Are you sure to continue? [y/N] " response
        case "$response" in
            [yY][eE][sS]|[yY]) 
                rsync -ravz --delete -P --exclude 'node_modules' -e 'ssh -p 22' $BUILD_PATH $HOST_DEPLOY:$TAGET_PATH;
                echo ">>> Restart container..."
                ssh $HOST_DEPLOY "docker restart $CONTAINER_NAME";
                echo ">>> Deploy done"
                rm -rf dist;
                echo ">>> Clean done"
                ;;
            *)
                echo "[x] Canceled deploy!"
                rm -rf dist;
                ;;
        esac
    else
        echo "[ERROR]: Cannot copy files."
    fi
else
    echo "[ERROR]: SCP .env FAIL."
fi