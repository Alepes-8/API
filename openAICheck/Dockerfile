# Step 1: Build Go binary
FROM golang:1.24-alpine AS builder

WORKDIR /app

# Copy go.mod first for caching
COPY ./openAICheck/go.mod ./openAICheck/main.go ./
RUN go mod download

# Copy Go source
COPY ./openAICheck/*.go ./

# Build the Go binary
RUN go build -o server main.go

# Step 2: Minimal runtime image
FROM alpine:latest

WORKDIR /app

# Install certificates
RUN apk --no-cache add ca-certificates

# Copy Go binary
COPY --from=builder /app/server .

# Copy Swagger UI static files
COPY ./swagger-ui/dist ./swagger-ui/dist

# Copy OpenAPI YAML files (now inside openAICheck)
COPY ./openAICheck/openapis ./openapis

# Copy projects openapi files.
# This is done in order to keep the pathing simular to local development while keeping them stored in the 
# swagger-ui docker container.
# If this wasn't done, the paths would need to be aquired through contacting the other containers, 
# which would be more complex and less efficient.
#COPY ./smallProjects/recipe_manager_api/openapi.yaml ./smallProjects/recipe_manager_api/openapi.yaml
#COPY ./smallProjects/task_tracker_api/openapi.yaml ./smallProjects/task_tracker_api/openapi.yaml

EXPOSE 8080

CMD ["./server"]
