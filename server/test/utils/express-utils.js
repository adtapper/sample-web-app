class Status {
  send(message) {
    return message;
  }
}

const res = {
  send: (data) => {return data},
  status: (status) => {return new Status()},
}

module.exports = res;