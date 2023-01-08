import { objectType } from 'nexus';

export const User = objectType({
  name: 'User',
  definition(t) {
    t.id('id');
    t.string('name');
    t.string('email');
    t.list.field('cocktails', {
      type: 'Cocktail',
      async resolve(_parent, _args, ctx) {
        return await ctx.prisma.user
          .findUnique({
            where: {
              id: _parent.id
            }
          })
          .cocktails();
      }
    });
  }
});