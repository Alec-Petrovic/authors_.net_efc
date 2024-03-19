using System;
using System.Collections.Generic;

namespace Server.Models;

public partial class Retired
{
    public int RetId { get; set; }

    public short RetAge { get; set; }

    public short? RetBooks { get; set; }

    public string? RetAuId { get; set; }

    public virtual Author? RetAu { get; set; }
}
