const fetch = require('node-fetch');

const getData = async instagramAccount => {
  console.log('Start Fetch 🏁');
  const web = await fetch(`https://www.instagram.com/${instagramAccount}/`);
  var proper = await web.text();
  proper = JSON.parse(
    proper.split('window._sharedData = ')[1].split(';</script>')[0]
  );
  const data = proper.entry_data.ProfilePage[0].graphql.user.edge_owner_to_timeline_media.edges.map(
    x => ({
      id: x.node.id,
      icecreamid: x.node.id,
      instagramAccount,
      timestamp: x.node.taken_at_timestamp,
      caption:
        x.node.edge_media_to_caption.edges[0] &&
        x.node.edge_media_to_caption.edges[0].node.text,
      likes: x.node.edge_liked_by.count,
      preview: x.node.media_preview,
      pic: x.node.thumbnail_resources.find(x => x.config_width === 320).src,
    })
  );
  //console.log(data);
  return data;
};

module.exports = getData;
