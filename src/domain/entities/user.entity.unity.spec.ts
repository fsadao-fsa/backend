import { User } from './user.entity';

describe('Domain > Entities > User', () => {
  describe('create', () => {
    it('shoud create a user when passing valid email and password', () => {
      const anEmail = 'john@doe.com';
      const aPassword = '12345678';

      const anUser = User.create({ email: anEmail, password: aPassword });

      expect(anUser).toBeInstanceOf(User);

      expect(anUser.getEmail()).toBe(anEmail);
      expect(anUser.getPassword()).not.toBe(aPassword);
      expect(anUser.comparePassword(aPassword)).toBe(true);
      expect(anUser.getId()).toBeDefined();
      //o tamamho de um Id valido é 36 caracteres
      expect(anUser.getId().length).toBe(36);
      expect(anUser.getCreatedAt()).toBeInstanceOf(Date);
      expect(anUser.getUpdatedAt()).toBeInstanceOf(Date);
    });
  });
});
