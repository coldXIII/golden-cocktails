import { DateTimeResolver } from 'graphql-scalars';
import { asNexusMethod, idArg, intArg, nonNull, nullable, objectType, stringArg } from 'nexus';

export const GQLDate = asNexusMethod(DateTimeResolver, 'date');

export const Cocktail = objectType({
  name: 'Cocktail',
  definition(t) {
    t.id('id');
    t.date('createdAt');
    t.string('title');
    t.nullable.string('content');
    t.nullable.string('recipe');
    t.nullable.string('history');
    t.nullable.string('imageUrl');
    t.nullable.int('rating');
    t.nullable.field('author', {
      type: 'User',
      async resolve(_parent, _args, ctx) {
        return await ctx.prisma.cocktail
          .findUnique({
            where: { id: _parent.id }
          })
          .author();
      }
    });
  }
});

export const Query = objectType({
  name: 'Query',
  definition(t) {
    t.field('cocktail', {
      type: 'Cocktail',
      args: {
        cocktailId: nonNull(stringArg())
      },
      async resolve(_, { cocktailId }, ctx) {
        return await ctx.prisma.cocktail.findUnique({
          where: { id: cocktailId }
        });
      }
    });

    t.list.field('cocktails', {
      type: 'Cocktail',
      async resolve(_parent, _args, ctx) {
        return await ctx.prisma.cocktail.findMany();
      }
    });

    t.list.field('users', {
      type: 'User',
      async resolve(_parent, _args, ctx) {
        return await ctx.prisma.user.findMany();
      }
    });

    t.list.field('searchCocktails', {
      type: 'Cocktail',
      args: {
        searchString: nullable(stringArg())
      },
      async resolve(_, { searchString }, ctx) {
        return await ctx.prisma.cocktail.findMany({
          where: {
            OR: [{ title: { contains: searchString } }, { content: { contains: searchString } }]
          }
        });
      }
    });
  }
});

export const Mutation = objectType({
  name: 'Mutation',
  definition(t) {
    t.field('signupUser', {
      type: 'User',
      args: {
        name: stringArg(),
        email: nonNull(stringArg())
      },
      async resolve(_, { name, email }, ctx) {
        return await ctx.prisma.user.create({
          data: {
            name,
            email
          }
        });
      }
    });

    t.field('createCocktail', {
      type: 'Cocktail',
      args: {
        title: nonNull(stringArg()),
        content: stringArg(),
        recipe: stringArg(),
        history: stringArg(),
        imageUrl: stringArg(),
        rating: intArg(),
        authorEmail: stringArg()
      },
      async resolve(_, { title, content, recipe, history, imageUrl, rating, authorEmail }, ctx) {
        return await ctx.prisma.cocktail.create({
          data: {
            title,
            content,
            recipe,
            history,
            imageUrl,
            rating,
            author: {
              connect: { email: authorEmail }
            }
          }
        });
      }
    });

    t.field('editCocktail', {
      type: 'Cocktail',
      args: {
        cocktailId: nonNull(idArg()),
        title: nonNull(stringArg()),
        content: nonNull(stringArg()),
        recipe: nonNull(stringArg()),
        history: nonNull(stringArg()),
        imageUrl: nonNull(stringArg()),
        rating: nonNull(intArg())
      },
      async resolve(_, args, ctx) {
        return await ctx.prisma.cocktail.update({
          where: { id: args.cocktailId },
          data: {
            title: args.title,
            content: args.content,
            recipe: args.recipe,
            history: args.history,
            imageUrl: args.imageUrl,
            rating: args.rating
          }
        });
      }
    });

    t.nullable.field('deleteCocktail', {
      type: 'Cocktail',
      args: {
        cocktailId: nonNull(idArg())
      },
      async resolve(_, { cocktailId }, ctx) {
        return await ctx.prisma.cocktail.delete({
          where: { id: cocktailId }
        });
      }
    });
  }
});
