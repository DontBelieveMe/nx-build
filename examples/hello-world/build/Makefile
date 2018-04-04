CC:=gcc
AR:=ar
CFLAGS:=-Wall -Werror -Wpedantic
LDFLAGS:=
INCLUDEDIRS:=-I../include
SOURCES:=../src/main.c ../src/impl.c
OBJECTS:=$(addprefix obj/, $(notdir $(SOURCES:.c=.o)))
TARGET_NAME:=helloWorld

all: $(SOURCES) $(TARGET_NAME)
$(TARGET_NAME): $(OBJECTS)
	@$(CC) $(LDFLAGS) $(OBJECTS) -o $@
	@echo Linking target!
obj/main.o: ../src/main.c
	@$(CC) $(INCLUDEDIRS) -c $(CFLAGS) $^ -o obj/main.o
	@echo [50%] Building file src/main.c
obj/impl.o: ../src/impl.c
	@$(CC) $(INCLUDEDIRS) -c $(CFLAGS) $^ -o obj/impl.o
	@echo [100%] Building file src/impl.c

