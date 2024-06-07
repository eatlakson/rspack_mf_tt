export default function () {
  return {
    name: "custom-plugin-build",
    beforeInit(args) {
      console.log("[build time inject] beforeInit: ", args);
      return args;
    },
    onLoad(args) {
      console.log("[build time inject] onLoad: ", args);
      return args;
    },
    beforeRequest(args) {
      // Here we can change/set the location of the remoteEntry.js file
      const urlMap = {
        mf_remote: "http://localhost:3002/remoteEntry.js"
      };

      const name = args.id;
      const remote = args.options.remotes.find((r) => r.name === name);
      remote.entry = urlMap[name];
      return args;
    },
    beforeLoadShare(args) {
      console.log("[build time inject] beforeLoadShare: ", args);
      return args;
    },
  };
}
