const API_BASE_URL = 'https://beatmeat.plasticine.ml';
const params = p.getRequest(); // req

const payload = JSON.parse(params.payload || '{}');
const user = +params.user;
const { action } = params;

const response = (data) => {
  p.ws.send('chat', {
    action,
    payload,
    response: { data, user },
  });
  p.response.json(data);
}

if (action === 'sign_up') {
  const model = await p.getModel('tgc_user');
  model.setOptions({ check_permission: false });

  try {
    const record = await model.insert(payload);
    return p.response.json({ user: record.attributes });
  } catch(error) {
    return p.response.json({ error: error })
  }
}

if (action === 'login') {
  const model = await p.getModel('tgc_user');
  model.setOptions({ check_permission: false });
  const record = await model.findOne(payload);

  if (record) {
    await record.update({ status: 'online' });
    const result = { ...record.attributes, status: 'online' };
    return p.response.json({ user: result });
  } else {
    return p.response.json({ error: { description: 'Wrong login or password. Try again' } });
  }
}

if (action === 'get_users') {
  const model = await p.getModel('tgc_user');
  const users = await model.find({ ...payload, deleted: false }).raw();

  return p.response.json({ users });
}

if (action === 'delete_user') {
  const model = await p.getModel('tgc_user');
  model.setOptions({ check_permission: false });

  try {
    const count = await model.find({ id: payload.id }).update({ deleted: true });
    return p.response.json({ deleted: !!count });
  } catch (error) {
    return p.response.json({ error: error })
  }
}

if (action === 'get_chats') {
  await db.model('tgc_user').where({ id: user }).update({ status: 'online' });
  const model = await p.getModel('tgc_chat');

  try {
    return p.response.json({ chats: await model.find({ participants: payload.id }).raw() });
  } catch (error) {
    return p.response.json({ error: error })
  }
}

if (action === 'create_chat') {
  const model = await p.getModel('tgc_chat');
  model.setOptions({ check_permission: false });

  try {
    const record = await model.insert(payload);
    return response({ chat: record.attributes });
  } catch (error) {
    p.log.info(error)
    return p.response.json({ error: error })
  }
}

if (action === 'delete_chat') {
  const model = await p.getModel('tgc_chat');
  model.setOptions({ check_permission: false });

  try {
    const count = await model.find({ id: payload.id }).delete();
    return response({ deleted: !!count });
  } catch (error) {
    return p.response.json({ error: error })
  }
}

if (action === 'get_messages') {
  const model = await p.getModel('tgc_message');

  try {
    return p.response.json({ messages: await model.find({ chat: payload.id }).raw() });
  } catch (error) {
    return p.response.json({ error: error })
  }
}

if (action === 'create_message') {
  const model = await p.getModel('tgc_message');
  model.setOptions({ check_permission: false });

  try {
    const record = await model.insert(payload);
    return response({ message: record.attributes });
  } catch (error) {
    return p.response.json({ error: error })
  }
}

if (action === 'delete_message') {
  const model = await p.getModel('tgc_message');
  model.setOptions({ check_permission: false });

  try {
    const count = await model.find({ id: payload.id }).delete();
    return response({ deleted: !!count });
  } catch (error) {
    return p.response.json({ error: error })
  }
}

if (action === 'update_message') {
  const model = await p.getModel('tgc_message');
  model.setOptions({ check_permission: false });

  try {
    const record = await model.findOne({ id: payload.id });
    const updated_record = await record.update({ content: payload.content })
    return response({ message: updated_record.attributes });
  } catch (error) {
    return p.response.json({ error: error })
  }
}

if (action === 'read_messages') {
  const model = await p.getModel('tgc_message');
  model.setOptions({ check_permission: false });
  
  try {
    const seen = await model.find({ chat: payload.id, user: {'!=': user} }).update({ seen: true }).raw();
    return response({ messages: seen });
  } catch (error) {
    return p.response.json({ error: error });
  }
}

if (action === 'typing') {
  try {
    return response({});
  } catch (error) {
    return p.response.json({ error: error })
  }
}

if (action === 'update_user') {
  const model = await p.getModel('tgc_user');
  model.setOptions({ check_permission: false });

  try {
    const record = await model.findOne({ id: payload.id });
    const updated_record = await record.update(lodash.omit(payload, ['id']));

    return p.response.json({ user: updated_record.attributes });
  } catch (error) {
    return p.response.error(error)
  }
}
