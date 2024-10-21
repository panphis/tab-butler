import type { PluginOption } from 'vite';
import { WebSocket } from 'ws';
import MessageInterpreter from '../interpreter';
import { LOCAL_RELOAD_SOCKET_URL } from '../constant';
import * as fs from 'fs';
import path from 'path';
import { InputOption } from 'rollup';

type PluginConfig = {
  onStart?: () => void;
  reload?: boolean;
  refresh?: boolean;
};

const injectionsPath = path.resolve(__dirname, '..', '..', '..', 'build', 'injections');

const refreshCode = fs.readFileSync(path.resolve(injectionsPath, 'refresh.js'), 'utf-8');
const reloadCode = fs.readFileSync(path.resolve(injectionsPath, 'reload.js'), 'utf-8');

export function watchRebuildPlugin(config: PluginConfig): PluginOption {
  let ws: WebSocket | null = null;
  const id = Math.random().toString(36);
  const { refresh, reload } = config;

  const hmrCode = (refresh ? refreshCode : '') + (reload ? reloadCode : '');

  function initializeWebSocket() {
    if (!ws) {
      ws = new WebSocket(LOCAL_RELOAD_SOCKET_URL);
      ws.onopen = () => {
        console.log(`[HMR] Connected to dev-server at ${LOCAL_RELOAD_SOCKET_URL}`);
      };
      ws.onerror = () => {
        console.error(`[HMR] Failed to start server at ${LOCAL_RELOAD_SOCKET_URL}`);
        console.warn('Retrying in 5 seconds...');
        ws = null;
        setTimeout(() => initializeWebSocket(), 5_000);
      };
    }
  }

  let inputConfig: InputOption | undefined = []

  let entryFiles: string[] = []

  return {
    name: 'watch-rebuild',
    writeBundle() {
      config.onStart?.();
      if (!ws) {
        initializeWebSocket();
        return;
      }
      /**
       * When the build is complete, send a message to the reload server.
       * The reload server will send a message to the client to reload or refresh the extension.
       */
      if (!ws) {
        throw new Error('WebSocket is not initialized');
      }
      ws.send(MessageInterpreter.send({ type: 'build_complete', id }));
    },
    // configResolved(config) {
    //   fs.writeFileSync(path.resolve(__dirname, './config.json'), JSON.stringify(config, null, 2));
    //   inputConfig = config.build.rollupOptions.input;
    //   console.log('inputConfig', inputConfig)
    //   // 处理 entry 为对象或数组的情况
    //   if (typeof inputConfig === 'object') {
    //     if (Array.isArray(inputConfig)) {
    //       entryFiles = inputConfig; // entry 为数组时
    //     } else {
    //       entryFiles = Object.values(inputConfig); // entry 为对象时提取值（文件路径）
    //     }
    //   } else {
    //     if (inputConfig === undefined) {
    //       console.error('No entry file found');
    //     } else {
    //       entryFiles = [inputConfig]; // 单个入口文件的情况
    //     }
    //   }
    // },

    // transform(code, id) {
    //   console.log(id, id)
    //   // 通过文件路径或 ID 判断是否为入口文件
    //   if (entryFiles.some(entry => id.includes(entry))) {
    //     const injectedCode = `(function() {let __HMR_ID = "${id}";\n${hmrCode}})();`;
    //     return {
    //       code: `${injectedCode}\n\r\t${code}`, // 在入口文件开头插入代码
    //       map: null
    //     };
    //   }
    //   return null; // 不处理其他文件
    // }

    generateBundle(_options, bundle) {

      fs.writeFileSync(path.resolve(__dirname, './options.json'), JSON.stringify(_options, null, 2));
      fs.writeFileSync(path.resolve(__dirname, './bundle.json'), JSON.stringify(bundle, null, 2));
      for (const module of Object.values(bundle)) {
        if (module.type === 'chunk') {
          module.code = `(function() {let __HMR_ID = "${id}";\n${hmrCode}})();\n${module.code}`;
        }
      }
    },
  };
}
