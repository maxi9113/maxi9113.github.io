PROJECT_NAME=tapas
WEBPACK_PORT=3000
HOST_PORT=3000

ifndef THIS_DOCKER_HOST
# esto no se puede cambiar
override THIS_DOCKER_HOST = host.docker.internal
endif

build_dev:
	docker build -t ${PROJECT_NAME} -f Dockerfile.dev  .


shell:
	docker run -it --rm -p ${WEBPACK_PORT}:${WEBPACK_PORT} -p 8000:8000  -v $(shell pwd):/app -e API_HOST=${THIS_DOCKER_HOST} -e WEBPACK_PORT=${WEBPACK_PORT} --entrypoint=/bin/ash ${PROJECT_NAME}
	
build_windows:
	docker build -t recobroswebfront -f Dockerfile  .

run:
	docker run -it --rm \
	           -p $(HOST_PORT):80 \
	           $(PROJECT_NAME)