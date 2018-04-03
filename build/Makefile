CC:=gcc
CFLAGS:=-c -Wall
LDFLAGS:=
INCLUDEDIRS:=-I../include
SOURCES:=../src/main.c ../src/impl.c
OBJECTS:=$(SOURCES:.c=.o)
OBJECTS:=$(addprefix obj/, $(notdir $(OBJECTS)))
TARGET_NAME:=helloWorld

all: $(SOURCES) $(TARGET_NAME)
$(TARGET_NAME): $(OBJECTS)
	@$(CC) $(LDFLAGS) $(OBJECTS) -o $@
	@echo Linking executable

obj/main.o: ../src/main.c
	@$(CC) $(INCLUDEDIRS) $(CFLAGS) $^ -o obj/main.o
	@echo [50%] Building file src/main.c
obj/impl.o: ../src/impl.c
	@$(CC) $(INCLUDEDIRS) $(CFLAGS) $^ -o obj/impl.o
	@echo [100%] Building file src/impl.c

