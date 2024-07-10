interface Props {}

export default function Section() {
  return (
    <div style={{ padding: '20px', minHeight: '100vh' }}>
      <iframe
        id="softr-5ecab925-9994-41b5-8983-f22223958eaf-user-accounts1"
        src="https://experts.deco.cx/embed/pages/5ecab925-9994-41b5-8983-f22223958eaf/blocks/user-accounts1"
        width="100%"
        height="1000"
        scrolling="no"
        frameBorder="0"
        style={{ border: 'none', display: 'block', margin: '0 auto' }}
      ></iframe>
      <script src="https://cdnjs.cloudflare.com/ajax/libs/iframe-resizer/4.2.11/iframeResizer.min.js"></script>
      <script>
        {`iFrameResize({ checkOrigin: false, log: true }, '#softr-5ecab925-9994-41b5-8983-f22223958eaf-user-accounts1');`}
      </script>
    </div>
  );
}
