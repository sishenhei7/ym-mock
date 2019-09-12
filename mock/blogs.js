import Mock from 'mockjs';

const List = [];
const count = 100;

for (let i = 0; i < count; i++) {
  List.push(Mock.mock({
    id: '@increment',
    label: [
      Mock.Random.cword(2, 5),
      Mock.Random.cword(2, 5),
      Mock.Random.cword(2, 5),
    ],
    'type|1': ['zh', 'en', 'all'],
    author: '@cname',
    title: Mock.Random.csentence(3, 10),
    isDraft: Mock.Random.boolean(),
    content: Mock.Random.csentence(100, 500),
    created_at: Mock.Random.date('yyyy-MM-dd'),
    updated_at: Mock.Random.date('yyyy-MM-dd'),
  }));
}

export default [{
    url: '/blogs',
    type: 'get',
    response: () => ({
      ok: true,
      data: List,
    }),
  },

  {
    url: '/blogs/:id',
    type: 'get',
    response: (req) => {
      const id = Number(req.params.id);
      const filteredList = List.filter(item => item.id === id);
      return {
        ok: true,
        data: filteredList,
      };
    },
  },

  {
    url: '/blogs',
    type: 'post',
    response: (req) => {
      const lastOne = List[List.length - 1];
      const parsedConfig = {
        title: req.body.title,
        label: JSON.parse(req.body.label),
        type: req.body.type,
        content: req.body.content,
        isDraft: !!req.body.isDraft,
      };
      const item = {
        ...parsedConfig,
        id: lastOne.id + 1,
        created_at: Mock.Random.date('yyyy-MM-dd'),
        updated_at: Mock.Random.date('yyyy-MM-dd'),
      };
      List.push(item);
      return {
        ok: true,
        data: List,
      };
    },
  },

  {
    url: '/blogs/:id',
    type: 'put',
    response: (req) => {
      const id = Number(req.params.id);
      const index = List.findIndex(item => item.id === id);

      const parsedConfig = {};
      for (let item in req.body) {
        if (item === 'label') {
          parsedConfig[item] = JSON.parse(req.body[item]);
        } else if (['title', 'type', 'content'].includes(item)) {
          parsedConfig[item] = req.body[item];
        } else if (item === 'isDraft') {
          parsedConfig[item] = !!req.body[item];
        }
      }

      List[index] = {
        ...List[index],
        ...parsedConfig,
      };

      return {
        ok: true,
        data: List,
      };
    },
  },

  {
    url: '/blogs/:id/publish',
    type: 'put',
    response: (req) => {
      const id = Number(req.params.id);
      const index = List.findIndex(item => item.id === id);
      List[index].isDraft = false;
      return {
        ok: true,
        data: List,
        index: index,
      };
    },
  },

  {
    url: '/blogs/:id',
    type: 'delete',
    response: (req) => {
      const id = Number(req.params.id);
      const index = List.findIndex(item => item.id === id);
      List.splice(index, 1);
      return {
        ok: true,
        data: List,
      };
    },
  },
];
