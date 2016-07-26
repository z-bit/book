import { Message, User, Thread } from '../models';
import { MessagesService } from './messages.service';

describe('MessagesService', () => {
    it('should test', () => {
        let user: User = new User('Nate', '');
        let thread: Thread = new Thread('t1', 'Nate', '');
        let m1: Message   = new Message({
            author: user,
            text: 'Hi!',
            thread: thread
        });
        let m2: Message = new Message({
            author: user,
            text: 'Bye!',
            thread: thread
        });

        let messagesService: MessagesService = new MessagesService();

        // listen to each message individually as it comes in
        messagesService.newMessages.subscribe(
            (message: Message) => {
                console.log('=> newMessges: ' + message.text);
            }
        );

        // listen to the stream of most current messages
        messagesService.messages.subscribe(
            (messages: Message[]) => {
                console.log('=> messages: ' + messages.length);
            }
        );

        messagesService.addMessage(m1);
        messagesService.addMessage(m2);
    });
});
