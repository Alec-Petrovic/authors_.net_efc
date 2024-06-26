﻿using System;
using System.Collections.Generic;

namespace Server.Models;

public partial class Title
{
    public string title_id { get; set; } = null!;

    public string title { get; set; } = null!;

    public string type { get; set; } = null!;

    public string? pub_id { get; set; }

    public decimal? price { get; set; }

    public decimal? advance { get; set; }

    public int? royalty { get; set; }

    public int? ytd_sales { get; set; }

    public string? notes { get; set; }

    public DateTime pubdate { get; set; }

    public virtual Publisher? Pub { get; set; }

    public virtual ICollection<Sale> Sales { get; set; } = new List<Sale>();

    public virtual ICollection<Titleauthor> Titleauthors { get; set; } = new List<Titleauthor>();
}
