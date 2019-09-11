import Mock from 'mockjs';

const List = [];
const count = 100;

for (let i = 0; i < count; i++) {
  List.push(Mock.mock({
    id: '@increment',
    label: Mock.Random.cword(2, 5),
    'type|1': ['zh', 'en', 'all'],
    author: '@cname',
    title: Mock.Random.csentence(3, 10),
    content: Mock.Random.csentence(100, 500),
    created_at: Mock.Random.date('yyyy-MM-dd'),
    updated_at: Mock.Random.date('yyyy-MM-dd'),
  }));
}

export default [
  {
    url: '/blogs',
    type: 'get',
    response: () => {
      return {
        ok: true,
        data: List,
      };
    },
  },

  {
    url: '/blogs/:id',
    type: 'get',
    response: config => {
      const id = Number(config.params.id);
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
    response: config => {
      const lastOne = List(List.length - 1);
      const item = {
        ...config.body.params,
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
    response: config => {
      const id = Number(config.params.id);
      const index = List.findIndex(item => item.id === id);
      List[index] = {
        ...List[index],
        ...config.body.params,
      };
      return {
        ok: true,
        data: List,
      };
    },
  },

  {
    url: '/blogs/:id',
    type: 'delete',
    response: config => {
      const id = Number(config.params.id);
      const index = List.findIndex(item => item.id === id);
      List.splice(index, 1);
      return {
        ok: true,
        data: List,
      };
    },
  },
];


