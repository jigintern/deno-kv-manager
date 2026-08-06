import { serveDir } from "https://deno.land/std@0.223.0/http/file_server.ts";
import { allDestroy, deleteTargetRows } from "./modules/delete.ts";
import { getAll, updateRows } from "./modules/put.ts";

const putRouter = async (
  path: string,
  request: Request,
): Promise<Response | undefined> => {
  switch (path) {
    // データ取得
    // リクエストボディが欲しいのでGETでなくPUT
    case "/get_all": {
      return await getAll(request);
    }
    // データ更新
    case "/rows": {
      return await updateRows(request);
    }
  }
  return undefined;
};

const deleteRouter = async (
  path: string,
  request: Request,
): Promise<Response | undefined> => {
  switch (path) {
    // データ全削除
    case "/all_destroy": {
      return await allDestroy(request);
    }
    // データ削除
    case "/rows": {
      return await deleteTargetRows(request);
    }
  }
  return undefined;
};

// Deno KVへの接続失敗などをフロントに伝える
// 例: URLの形式違いや無効なアクセストークン
const errorResponse = (error: unknown): Response => {
  console.error(error);

  const message = error instanceof Error ? error.message : String(error);

  return new Response(
    JSON.stringify({ error: message }),
    {
      status: 500,
      headers: { "content-type": "application/json" },
    },
  );
};

Deno.serve({ port: 8080 }, async (request) => {
  const method = request.method;
  const pathname = new URL(request.url).pathname;

  try {
    switch (method) {
      case "PUT": {
        const res = await putRouter(pathname, request);
        if (res !== undefined) {
          return res;
        }
        break;
      }
      case "DELETE": {
        const res = await deleteRouter(pathname, request);
        if (res !== undefined) {
          return res;
        }
        break;
      }
    }
  } catch (error) {
    return errorResponse(error);
  }

  return serveDir(
    request,
    {
      fsRoot: "./public/",
      urlRoot: "",
      enableCors: true,
    },
  );
});
