using System;
using System.Collections.Generic;

namespace Server.Models;

public partial class MulAuthor
{
    public string TitleId { get; set; } = null!;

    public int? AuthorCount { get; set; }
}
