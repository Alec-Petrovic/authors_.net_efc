using System;
using System.Collections.Generic;

namespace Server.Models;

public partial class Author
{
    public string? au_id { get; set; }

    public string au_lname { get; set; } = null!;

    public string au_fname { get; set; } = null!;

    public string phone { get; set; } = null!;

    public string? address { get; set; }

    public string? city { get; set; }

    public string? state { get; set; }

    public string? zip { get; set; }

    public bool contract { get; set; }//was a string

    public virtual ICollection<Retired> Retireds { get; set; } = new List<Retired>();

    public virtual ICollection<Titleauthor> Titleauthors { get; set; } = new List<Titleauthor>();
}

