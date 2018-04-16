Directory.each(src, function (dir, files, dirs) {
               
    files = files.map(function (file) {
      var name = Path.relative(root, file);
      var ext = Path.ext(file);

      return {
        'type': 'file',
        'name': name,
        'ext': ext,
        'stat': fs.statSync(file),
      };
    });


    dirs = dirs.map(function (sdir) {
      var name = Path.relative(root, sdir);

      return {
        'type': 'dir',
        'name': name,
        'stat': fs.statSync(sdir),
      };
    });

    list.push(...dirs, ...files);
});