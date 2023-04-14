"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AppGateway = void 0;
const websockets_1 = require("@nestjs/websockets");
const socket_io_1 = require("socket.io");
const user_service_1 = require("./user/user.service");
const create_message_dto_1 = require("./chat/dto/create-message.dto");
const chat_service_1 = require("./chat/chat.service");
const common_1 = require("@nestjs/common");
const room_service_1 = require("./room/room.service");
const create_room_dto_1 = require("./room/dto/create-room.dto");
let AppGateway = class AppGateway {
    constructor(userService, chatService, roomService) {
        this.userService = userService;
        this.chatService = chatService;
        this.roomService = roomService;
    }
    onModuleInit() {
        this.server.on('connection', (socket) => {
            socket.on('get-user-ids', async (ids) => {
                console.log("ids: " + ids);
                const currentRoom = await this.roomService.getRoomByUsersId([ids.userToChatId, ids.currentUserId]);
                if (!currentRoom) {
                    console.log("Room not found creating new one");
                    const roomDto = new create_room_dto_1.CreateRoomDto();
                    roomDto.users = [ids.userToChatId, ids.currentUserId];
                    await this.roomService.createRoom(roomDto);
                    this.onModuleInit();
                }
                socket.join(`room-${currentRoom.id}`);
            });
        });
    }
    async handleNewMessage(payload, client) {
        console.log(payload);
        const newMessageDto = new create_message_dto_1.CreateMessageDto(payload.currentUserId, payload.userToChatId, payload.content);
        const currentRoom = await this.roomService.getRoomByUsersId([payload.userToChatId, payload.currentUserId]);
        const roomName = `room-${currentRoom.id}`;
        try {
            const currentUser = await this.userService.getUserById(payload.currentUserId);
            const userToChatWith = await this.userService.getUserById(payload.userToChatId);
            if (!currentUser && !userToChatWith) {
                throw new common_1.HttpException("Bad request", common_1.HttpStatus.BAD_REQUEST);
            }
            const addedMessage = await this.chatService.addMessage(newMessageDto);
            this.server.to(roomName).emit('send-new-message', {
                message: addedMessage,
                room: roomName,
                creator: `${currentUser.firstName} ${currentUser.lastName} (${currentUser.username})`
            });
        }
        catch (err) {
            console.log(err);
            throw new common_1.HttpException("Something went wrong please try again later!", common_1.HttpStatus.BAD_REQUEST);
        }
    }
};
__decorate([
    (0, websockets_1.WebSocketServer)(),
    __metadata("design:type", socket_io_1.Server)
], AppGateway.prototype, "server", void 0);
__decorate([
    (0, websockets_1.SubscribeMessage)('new-message'),
    __param(0, (0, websockets_1.MessageBody)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, socket_io_1.Socket]),
    __metadata("design:returntype", Promise)
], AppGateway.prototype, "handleNewMessage", null);
AppGateway = __decorate([
    (0, websockets_1.WebSocketGateway)(5297, {
        cors: {
            origin: "*"
        }
    }),
    __metadata("design:paramtypes", [user_service_1.UserService, chat_service_1.ChatService, room_service_1.RoomService])
], AppGateway);
exports.AppGateway = AppGateway;
//# sourceMappingURL=app.gateway.js.map